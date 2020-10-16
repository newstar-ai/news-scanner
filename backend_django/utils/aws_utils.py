import os

def s3_upload(file):
	name = file
	saved_url = f'http://host/example/{name}.png'
	return saved_url