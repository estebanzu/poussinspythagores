# Makefile for Super Maths CP Node.js app

# Load .env if present
-include .env
export

# Variables
APP_NAME = super-maths-cp
PORT ?= 3000

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

.PHONY: all install dev start stop build deploy clean security security-fix lint geome frontend-qa check test help css format format-check gitleaks verify css-check audit-prod

all: dev

help:
	@echo "Super Maths CP - available targets:"
	@echo "  make install        Install npm dependencies"
	@echo "  make dev            Start development server"
	@echo "  make start          Start production server"
	@echo "  make stop           Stop server on port $(PORT)"
	@echo "  make build          Prepare build artefacts for Vercel"
	@echo "  make deploy         Deploy to Vercel (requires VERCEL_TOKEN)"
	@echo "  make css            Rebuild Tailwind CSS"
	@echo "  make lint           Run ESLint"
	@echo "  make format         Format all files with Prettier"
	@echo "  make format-check   Check Prettier formatting"
	@echo "  make test           Run unit tests"
	@echo "  make geome          Geometry game QA"
	@echo "  make frontend-qa    Frontend QA"
	@echo "  make check          Run format-check, lint, test, geome and frontend-qa"
	@echo "  make security       Run npm security audit"
	@echo "  make security-fix   Run npm audit fix"
	@echo "  make audit-prod     Run npm audit (production deps only)"
	@echo "  make gitleaks       Scan for secrets with Gitleaks"
	@echo "  make css            Rebuild Tailwind CSS"
	@echo "  make css-check      Verify public/styles.css is up to date"
	@echo "  make verify         Run check, security and gitleaks"
	@echo "  make clean          Remove build artefacts"
	@echo "  make help           Show this help"

install:
	@echo "Installing npm dependencies..."
	npm install

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

security:
	@echo "Running npm security audit..."
	npm audit

security-fix:
	@echo "Running npm audit fix..."
	npm audit fix

lint:
	@echo "Running ESLint..."
	npm run lint

geome:
	@echo "Geometry game QA..."
	node scripts/qa.js --geome

frontend-qa:
	@echo "Frontend QA..."
	node scripts/qa.js --frontend

check: format-check lint test geome frontend-qa
	@echo "All checks passed."

test:
	@echo "Running tests..."
	npm test

css:
	@echo "Rebuilding Tailwind CSS..."
	npm run build:css

format:
	@echo "Formatting files with Prettier..."
	npm run format

format-check:
	@echo "Checking Prettier formatting..."
	npx prettier --check .

gitleaks:
	@echo "Scanning for secrets with Gitleaks..."
	gitleaks detect --source . --no-banner

verify: check security gitleaks
	@echo "All verification checks passed."

css-check:
	@echo "Checking public/styles.css is up to date..."
	npx tailwindcss -i ./src/styles.css -o /tmp/styles.css.check --minify
	@if cmp -s public/styles.css /tmp/styles.css.check; then echo "public/styles.css is up to date."; rm -f /tmp/styles.css.check; else echo "ERROR: public/styles.css is out of date. Run 'make css' to rebuild it."; rm -f /tmp/styles.css.check; exit 1; fi

audit-prod:
	@echo "Running npm audit (production dependencies only)..."
	npm audit --omit=dev

clean:
	@echo "Cleaning build artefacts..."
	rm -rf .vercel_build_output
