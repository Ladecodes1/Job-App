# JobHunt Fast - Remote Job Search App

## 🚀 Features
- Browse latest remote jobs from ArbeitNow API
- Filter by role, company, or location
- Responsive design works on all devices
- Docker containerized deployment
- Load-balanced across multiple servers

## 🛠️ Technologies Used
| Component       | Technology |
|-----------------|------------|
| Frontend        | HTML5, CSS3, JavaScript |
| Server          | Nginx (static hosting) |
| Containerization| Docker |
| Load Balancing  | HAProxy |

## 📦 Installation

### Local Development
```bash
git clone https://github.com/Ladecodes1/Job-App.git
cd Job-App
python3 -m http.server 8000
Access at: http://localhost:8000

Docker Deployment
bash
# Build the image
docker build -t job-app .

# Run the container
docker run -p 8080:80 job-app
Access at: http://localhost:8080

🌐 Production Deployment
On Each Web Server (web-01, web-02):
bash
git clone https://github.com/Ladecodes1/Job-App.git
cd Job-App
docker build -t job-app .
docker run -d --name app -p 80:80 job-app
Load Balancer Configuration (lb-01):
nginx
backend webapps
  balance roundrobin
  server web01 web-01:80 check
  server web02 web-02:80 check
🛠️ Maintenance
Common Commands
bash
# Check running containers
docker ps

# View logs
docker logs app

# Restart services
docker compose restart
🛑 Troubleshooting
Issue	Solution
Port conflicts	docker stop app && docker rm app
API connection failed	Verify https://www.arbeitnow.com/api/job-board-api is accessible

SSH connection refused	docker restart web-01
HAProxy not balancing	Check /etc/haproxy/haproxy.cfg syntax


📜 License
MIT © [Naomi Bamgbose] 2025
Project submitted for [Your Course Name]