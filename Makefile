# Makefile for Super Maths CP Node.js app

# Variables
APP_NAME = super-maths-cp
PORT ?= 3000
VERCEL_TOKEN ?= $(shell echo $$VERCEL_TOKEN)
SUPABASE_URL ?= $(shell echo $$SUPABASE_URL)
SUPABASE_ANON_KEY ?= $(shell echo $$SUPABASE_ANON_KEY)

.PHONY: all install dev start stop build deploy clean

all: install dev

# Install all npm dependencies (including Supabase & Nodemon)
install:
	@echo "Installing npm dependencies..."
	npm install

# Development server with hot‑reload (nodemon)
dev:
	@echo "Starting development server..."
	npm run dev

# Production start (node)
start:
	@echo "Starting production server..."
	npm start

# Stop the server (kills any node process using the defined PORT)
stop:
	@echo "Stopping server on port $(PORT)..."
	@PID=$$(lsof -t -i:$(PORT)) && if [ -n "$$PID" ]; then kill -9 $$PID && echo "Killed PID $$PID"; else echo "No process running on port $(PORT)"; fi

# Build step – Vercel needs a "build" script; for a static PWA we just copy files
build:
	@echo "Preparing build artefacts for Vercel..."
	mkdir -p .vercel_build_output
	cp -r index.html public server.js package.json README.md .vercel_build_output/

# Deploy to Vercel (requires Vercel CLI installed and VERCEL_TOKEN set)
# The token can be stored in a .env file or exported before running make.
deploy:
	@echo "Deploying to Vercel..."
	@if [ -z "$(VERCEL_TOKEN)" ]; then echo "Error: VERCEL_TOKEN not set"; exit 1; fi
	vercel --prod --token $(VERCEL_TOKEN)

# Clean temporary build artefacts
clean:
	@echo "Cleaning build artefacts..."
	rm -rf .vercel_build_output
