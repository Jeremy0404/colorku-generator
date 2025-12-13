# Deployment & Update Guide

## Prerequisites

- SSH access to your VPS.
- The project is already cloned on the VPS.
- `docker` and `docker compose` are installed on the VPS.

## How to Update

To update your deployed application with the latest changes from GitHub, follow these steps:

### 1. Push Local Changes
Ensure all your local changes are committed and pushed to the `main` branch.
```sh
git push origin main
```

### 2. Connect to Your Server
SSH into your VPS (replace `user` and `your-server-ip` with your actual details):
```sh
ssh user@your-server-ip
```

### 3. Navigate to Project Directory
Go to the folder where you cloned the repository:
```sh
cd ~/colorku-generator
```
*(Adjust the path if you cloned it somewhere else)*

### 4. Pull Latest Code
Fetch the changes from GitHub:
```sh
git pull
```

### 5. Rebuild and Restart
Update the running container. This command will rebuild the image if there are changes and restart the container in the background.
```sh
docker compose up -d --build
```
- `-d`: Detached mode (runs in background).
- `--build`: Forces a rebuild of the image locally to ensure new code is included.

### 6. Verification
Check if the container is running:
```sh
docker compose ps
```
You can also follow the logs to ensure everything started correctly:
```sh
docker compose logs -f
```

## First Time Deployment?

If this is your first time deploying on a new server:

1. SSH into the server.
2. Clone the repository:
   ```sh
   git clone https://github.com/Jeremy0404/colorku-generator.git
   cd colorku-generator
   ```
3. Start the application:
   ```sh
   docker compose up -d --build
   ```