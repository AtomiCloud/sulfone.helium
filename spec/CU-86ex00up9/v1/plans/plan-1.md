# Plan 1: Remove Old Infrastructure & Document CyanPrint Pattern

## Goal and Scope

Completely remove all old k6/docker-compose-based test infrastructure and create comprehensive skill documentation for the new CyanPrint test framework. This establishes the foundation for the new testing approach.

## Specific Files to Modify

### Remove Old Files:

- Root directory:
  - `docker-compose.template.yaml`
  - `docker-compose.resolver.yaml`
  - `scripts/test.sh`
- SDK directories:
  - `sdks/node/template_test.ts`
  - `sdks/node/resolver_test.ts`
  - `sdks/python/template_test.py`
  - `sdks/python/resolver_test.py`
  - `sdks/dotnet/template.Dockerfile`
  - `sdks/dotnet/resolver.Dockerfile`
  - `sdks/node/template.Dockerfile`
  - `sdks/node/resolver.Dockerfile`
  - `sdks/python/template.Dockerfile`
  - `sdks/python/resolver.Dockerfile`
- CI:
  - `.github/workflows/⚡reusable-tests.yaml`
  - Remove `template-test` job from `.github/workflows/ci.yaml`
- Build artifacts:
  - `k6/` directory (entire directory)
  - `tasks/Taskfile.test.yaml`

### Create New Files:

- `.claude/skills/cyanprint-test/SKILL.md` - Complete skill documentation

## Suggested Approach

1. **Systematic removal**: Go through the removal list systematically, using `git rm` to track deletions
2. **Documentation first**: Create the skill documentation before removal to preserve knowledge
3. **Validation**: Verify removal completeness by checking no old test files remain
4. **CI cleanup**: Carefully update CI configuration to avoid breaking existing workflows

## Edge Cases to Handle

- **Existing CI dependencies**: Ensure removing reusable-tests.yaml doesn't break other workflows that might reference it
- **Backup of removal list**: Keep a temporary list of removed files for potential rollback
- **Directory cleanup**: Ensure empty directories are properly removed (k6/)

## How to Test Independently

1. Verify all old files are removed:
   ```bash
   # Should return no results
   find . -name "docker-compose*" -o -name "k6" -o -name "*_test.*" | grep -v "sdks/node/src" | grep -v "sdks/python/cyanprintsdk" | grep -v "sdks/dotnet/sulfone-helium"
   ```
2. Verify skill file exists and is valid:
   ```bash
   cat .claude/skills/cyanprint-test/SKILL.md
   ```

## Integration Points with Other Plans

- **Plan 2**: Depends on successful removal of old Dockerfiles (which will be replaced)
- **Plan 3**: The skill documentation will be used as reference when creating test configurations

## Implementation Checklist

From task-spec.md Step 1 and Step 2:

- [ ] Old artifacts and test infrastructure fully removed
- [ ] Skill `.claude/skills/cyanprint-test/SKILL.md` exists and documents the full pattern
