# AI Agents Configuration

This file defines rules, guidelines, and behaviors for AI agents working on this project.

## Core Rules

### 1. User Consent Required
**MANDATORY**: Always ask the user for explicit confirmation before:
- Committing changes (`git commit`)
- Pushing changes (`git push`)
- Creating pull requests
- Merging branches
- Any destructive operations on the repository

**Why**: Users must maintain full control over their codebase and version history.

### 2. No Unauthorized Changes
- Never make changes without user knowledge
- Never commit sensitive data (passwords, API keys, tokens)
- Never push to main/master without explicit approval
- Never force push (`git push --force`)

## Communication Guidelines

### Ask for Clarification
- Ask questions when requirements are unclear
- Confirm understanding before implementing complex features
- Request feedback on proposed solutions

### Provide Context
- Explain what changes are being made and why
- Warn about potential side effects
- Suggest testing steps when appropriate

## Code Quality Standards

### Before Committing
- Run linting commands if available (`npm run lint`, `ruff`, etc.)
- Run type checking (`npm run typecheck`, `tsc`, etc.)
- Run tests if they exist
- Ensure code follows existing patterns and conventions

### Security
- Never hardcode secrets or credentials
- Use environment variables for sensitive data
- Follow security best practices (OWASP guidelines)
- Validate and sanitize all user inputs

## Git Workflow

### Allowed Operations (Without Explicit Permission)
- `git status` - Check repository state
- `git log` - View commit history
- `git diff` - Review changes
- `git add` - Stage files (only for review, not committing)
- `git branch` - List or create branches
- `git checkout` - Switch branches
- `git stash` - Temporarily store changes

### Operations Requiring Explicit Permission
- `git commit` - **ASK FIRST**
- `git push` - **ASK FIRST**
- `git merge` - **ASK FIRST**
- `git rebase` - **ASK FIRST** (can be destructive)
- `git reset --hard` - **ASK FIRST** (destructive)
- `git clean -fd` - **ASK FIRST** (destructive)
- Any operation with `--force` or `-f` flag - **ASK FIRST**

## File Operations

### Read Operations (Always Allowed)
- Reading existing files
- Searching/grepping code
- Listing directory contents
- Viewing configuration files

### Write Operations (Require Confirmation)
- Creating new files
- Modifying existing files
- Deleting files
- Renaming files
- Bulk replacements

## Environment & Configuration

### Sensitive Files (Never Modify Without Permission)
- `.env` files
- Configuration files with credentials
- SSH keys or certificates
- API key files
- Database connection strings

### Safe Operations
- Reading logs
- Checking container status
- Testing endpoints
- Verifying configurations

## Testing Requirements

### Before Marking Complete
- Verify changes work as expected
- Test in the appropriate environment
- Check for console errors or warnings
- Ensure no breaking changes

### Ask User to Test When
- UI/UX changes are made
- Database migrations are involved
- Authentication/authorization changes
- Payment processing code
- Critical business logic

## Error Handling

### When Errors Occur
1. Explain what went wrong in plain language
2. Suggest potential solutions
3. Ask user how they want to proceed
4. Never hide or suppress error messages

### Recovery Steps
- Provide rollback instructions if needed
- Suggest git commands to undo changes
- Offer to create a backup branch

## Project-Specific Rules

### Technology Stack
- Follow existing code style and patterns
- Use project-specific linting rules
- Respect framework conventions (React, Vue, Angular, etc.)
- Match existing file naming conventions

### Documentation
- Update README.md when adding new features
- Document API changes
- Add comments for complex logic
- Keep AGENTS.md updated with new rules

## Emergency Procedures

### If Something Goes Wrong
1. **Stop immediately** - Don't make additional changes
2. **Inform the user** - Explain what happened
3. **Assess the damage** - Check what was affected
4. **Propose solutions** - Offer recovery options
5. **Wait for instructions** - Don't proceed without approval

### Recovery Commands
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - ASK FIRST!
git reset --hard HEAD~1

# Stash current changes
git stash

# Restore stashed changes
git stash pop
```

## Communication Style

### Be Clear and Concise
- Use simple, direct language
- Avoid technical jargon when possible
- Use bullet points for lists
- Highlight important information

### Be Honest About Limitations
- Acknowledge when you don't know something
- Suggest when human review is needed
- Admit mistakes and offer corrections

## Version Control Best Practices

### Commit Messages
- Use clear, descriptive messages
- Follow conventional commits format if project uses it
- Reference issue numbers when applicable
- Explain the "why" not just the "what"

### Branching Strategy
- Create feature branches for new work
- Use descriptive branch names
- Keep branches focused on single features
- Clean up merged branches

## Final Notes

### User is Always in Control
- This configuration prioritizes user autonomy
- AI agents assist, they don't replace human judgment
- When in doubt, ask the user
- Better to ask permission than beg forgiveness

### Continuous Improvement
- This file should evolve with the project
- Add new rules as patterns emerge
- Remove outdated guidelines
- Document exceptions and special cases

---

**Last Updated**: 2026-02-12  
**Purpose**: Ensure safe, transparent, and collaborative AI assistance  
**Status**: Active