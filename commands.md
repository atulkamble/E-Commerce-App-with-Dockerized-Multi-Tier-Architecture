sudo yum update -y
sudo yum upgrade -y
sudo yum install tree -y
sudo yum install git -y
git --version
git config --global user.name "Atul Kamble"
git config --global user.email "atul_kamble@hotmail.com"
git config --list
touch .gitignore
sudo nano .gitignore
// add file name
touch github_token.txt

git clone https://github.com/atulkamble/E-Commerce-App-with-Dockerized-Multi-Tier-Architecture.git
cd E-Commerce-App-with-Dockerized-Multi-Tier-Architecture
sudo yum install docker -y
docker --version
sudo systemctl start docker
sudo systemctl enable docker
sudo docker login
