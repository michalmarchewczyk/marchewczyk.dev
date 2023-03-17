---
index: 0
category: Web App
size: lg
title: Light-Whale
description: Easy and light-weight self-hosting solution for configuring, deploying, publishing and managing websites based on Docker containers and Docker compose apps
technologies: SvelteKit, Tailwind CSS, daisyUI, TypeScript, Docker, NGINX
github: https://github.com/michalmarchewczyk/light-whale
---

Light-Whale is a self-hosted solution for configuring, deploying, publishing and managing websites.  
It uses Docker containers and Docker compose apps.

## Features

- **Easily manage docker** images, containers and compose apps
- Quickly **deploy containers** to websites
- **Automatic DNS** records configuration for sites
- Enable **SSL** for sites with one click
- Build containers and apps from **Git repositories**
- Browse and pull Git repositories from **GitHub, GitLab** and **Bitbucket**
- Download images from **Dockerhub**
- Straightforward installation and setup


## How it works

Light-Whale consists of two parts: 
- Node.js web app that enables you to manage everything from a simple dashboard
- NGINX Docker container that serves as a reverse proxy for your websites and manages SSL certificates 

Docker containers and apps can be created by building Git repositories or by pulling images from Dockerhub.

Using a dashboard you can manage and configure you containers and apps.  
You can start, stop, restart and remove them from the dashboard.  
You can also view their logs, browse files, view statistics.

All Light-Whale sites are connected to your Docker containers and listening on specified ports.

Sites DNS records and SSL certificates are automatically managed by Light-Whale.
