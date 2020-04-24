#!/bin/bash
sleep 5
/home/ubuntu/ffmpeg_sources/ffmpeg/ffmpeg -framerate 30 -video_size 640x480 -f v4l2 -i /dev/video0  -vcodec libx264 -vprofile baseline -b:v 500k -bufsize 600k -tune zerolatency -pix_fmt yuv420p -r 15 -g 30 -f rawvideo tcp://localhost:5000 2> ./ffmpeg.log
