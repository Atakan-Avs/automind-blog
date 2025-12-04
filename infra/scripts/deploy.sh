cd /home/ec2-user/automind-blog/infra

echo "Pulling latest images..."
docker compose pull

echo "Restarting services..."
docker compose up -d

echo "Deployment completed."