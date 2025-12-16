version: '3.8'
services:
  ant-media-server:
    image: antmedia/community:latest
    container_name: ant-media-test
    restart: unless-stopped
    ports:
      - "5080:5080"
    volumes:
      - antmedia_data:/usr/local/antmedia
volumes:
  antmedia_data:
