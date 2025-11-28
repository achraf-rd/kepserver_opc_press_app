# SSL Certificates for achrafrachid.salon

This directory should contain your SSL certificates:

## Required files:
- `achrafrachid.salon.crt` - SSL certificate file
- `achrafrachid.salon.key` - Private key file

## To obtain SSL certificates:

### Option 1: Let's Encrypt (Free)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d achrafrachid.salon -d www.achrafrachid.salon

# Copy certificates to this directory
sudo cp /etc/letsencrypt/live/achrafrachid.salon/fullchain.pem ./achrafrachid.salon.crt
sudo cp /etc/letsencrypt/live/achrafrachid.salon/privkey.pem ./achrafrachid.salon.key
```

### Option 2: Commercial SSL Provider
- Purchase SSL certificate from providers like CloudFlare, DigiCert, etc.
- Download the certificate files and rename them accordingly

### Option 3: Self-signed (Development only)
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout achrafrachid.salon.key \
  -out achrafrachid.salon.crt \
  -subj "/C=MA/ST=State/L=City/O=Organization/OU=OrgUnit/CN=achrafrachid.salon"
```

## File permissions:
```bash
chmod 600 *.key
chmod 644 *.crt
```

## Important:
- Never commit private key files to version control
- Add `*.key` to your `.gitignore`