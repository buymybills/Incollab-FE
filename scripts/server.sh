#!/bin/bash

MODE=$1 # setup or deploy

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${BLUE}INFO: $1${NC}"
}

echo_success() {
    echo -e "${GREEN}SUCCESS: $1${NC}"
}

setup_server() {
    echo_info "Starting server setup..."
    
    # Update system
    echo_info "Updating system packages..."
    sudo apt-get update
    sudo apt-get upgrade -y

    # Install Docker if not installed
    if ! command -v docker &> /dev/null; then
        echo_info "Installing Docker..."
        sudo apt-get install -y docker.io
        sudo systemctl start docker
        sudo systemctl enable docker
        sudo usermod -aG docker ubuntu
        echo_success "Docker installed successfully"
    else
        echo_info "Docker already installed"
    fi

    # Install Nginx if not installed
    if ! command -v nginx &> /dev/null; then
        echo_info "Installing Nginx..."
        sudo apt-get install -y nginx
        echo_success "Nginx installed successfully"
    else
        echo_info "Nginx already installed"
    fi

    # Install Certbot
    echo_info "Installing Certbot..."
    sudo apt-get install -y certbot python3-certbot-nginx

    # Setup Nginx configuration
    echo_info "Setting up Nginx configuration..."
    sudo cp nginx/default.conf /etc/nginx/sites-available/incollab-fe
    sudo ln -s /etc/nginx/sites-available/incollab-fe /etc/nginx/sites-enabled/ || true
    sudo rm /etc/nginx/sites-enabled/default || true
    sudo nginx -t && sudo systemctl restart nginx

    echo_success "Server setup completed!"
    echo_info "Next steps:"
    echo "1. Configure your domain DNS to point to this server"
    echo "2. Run: sudo certbot --nginx -d your-domain.com"
}

deploy_app() {
    echo_info "Starting deployment..."
    
    # Clean up old PWA files if they exist
    echo_info "Cleaning up old PWA files..."
    rm -f public/sw.js public/workbox-*.js public/fallback-*.js public/worker-*.js || true
    
    # Pull the latest image
    echo_info "Pulling latest Docker image..."
    docker pull buymybills/incollab-fe:latest
    
    # Stop and remove existing container
    echo_info "Stopping existing container..."
    docker stop incollab-fe || true
    docker rm incollab-fe || true
    
    # Run new container
    echo_info "Starting new container..."
    docker run -d \
        --name incollab-fe \
        --restart unless-stopped \
        -p 3000:3000 \
        -e NODE_ENV=production \
        -e HOSTNAME="0.0.0.0" \
        buymybills/incollab-fe:latest
    
    # Verify deployment
    if [ "$(docker ps -q -f name=incollab-fe)" ]; then
        echo_success "Deployment successful! Container is running."
        echo_info "Container logs:"
        docker logs --tail 10 incollab-fe
    else
        echo "ERROR: Deployment failed. Container is not running."
        exit 1
    fi
}

case $MODE in
    "setup")
        setup_server
        ;;
    "deploy")
        deploy_app
        ;;
    *)
        echo "Usage: $0 {setup|deploy}"
        echo "  setup  - First-time server setup (install Docker, Nginx, etc.)"
        echo "  deploy - Deploy or update the application"
        exit 1
        ;;
esac