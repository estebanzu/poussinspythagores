# Makefile for Super Maths CP Node.js app

# Load .env if present
-include .env
export

# Variables
APP_NAME = super-maths-cp
PORT ?= 3000
VERCEL_TOKEN ?= $(VERCEL_TOKEN)
SUPABASE_URL ?= $(SUPABASE_URL)
SUPABASE_ANON_KEY ?= $(SUPABASE_ANON_KEY)

# OS detection
UNAME_S := $(shell uname -s 2>/dev/null || echo Windows)
ifeq ($(UNAME_S),Darwin)
  OPEN = open
  KILL = kill -9 $$(lsof -t -i:$(PORT))
else ifeq ($(findstring Linux,$(UNAME_S)),Linux)
  OPEN = xdg-open
  KILL = kill -9 $$(lsof -t -i:$(PORT))
else
  # Windows (MSYS, Git Bash, WSL, cmd)
  OPEN = start http://localhost:$(PORT)
  KILL = for /f "tokens=5" %a in ('netstat -aon ^| findstr :$(PORT)') do taskkill /F /PID %a
endif

.PHONY: all dev start stop build deploy clean

all: dev

node_modules: package.json
	@echo "Installing npm dependencies..."
	npm install
	@touch node_modules

dev: node_modules
	@echo "Starting development server..."
	@(sleep 1.5 && ($(OPEN) http://localhost:$(PORT) || true)) &
	npm run dev

start: node_modules
	@echo "Starting production server..."
	@(sleep 1.5 && ($(OPEN) http://localhost:$(PORT) || true)) &
	npm start

stop:
	@echo "Stopping server on port $(PORT)..."
	@$(KILL) || echo "No process running on port $(PORT)"

build:
	@echo "Preparing build artefacts for Vercel..."
	mkdir -p .vercel_build_output
	cp -r index.html public server.js package.json README.md .vercel_build_output/

deploy:
	@echo "Deploying to Vercel..."
	@if [ -z "$(VERCEL_TOKEN)" ]; then echo "Error: VERCEL_TOKEN not set"; exit 1; fi
	vercel --prod --token $(VERCEL_TOKEN)

clean:
	@echo "Cleaning build artefacts..."
	rm -rf .vercel_build_output
