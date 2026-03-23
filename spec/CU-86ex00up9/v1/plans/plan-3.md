# Plan 3: Create Test Configurations & Update CI

## Goal and Scope

Create comprehensive test configurations for all 12 artifact combinations and update the CI infrastructure to run tests using the new CyanPrint framework. This completes the migration to the new testing system.

## Specific Files to Modify

### Test Files:

- 12 test.cyan.yaml files (one per artifact-language combination)
- 12 snapshots/ directories (one per artifact-language combination)
- Input files for processor and resolver tests

### Infrastructure Updates:

- Root `Taskfile.yaml` - add test tasks
- `.github/workflows/ci.yaml` - replace template-test job
- Create `.github/workflows/⚡reusable-cyanprint-test.yaml`

## Suggested Approach

1. **Template-first approach**: Create base test templates for each artifact type:
   - Template tests: Focus on questionnaire initialization and completion
   - Processor tests: Focus on variable replacement and file generation
   - Plugin tests: Focus on plugin execution and validation
   - Resolver tests: Focus on merge strategies and configuration
2. **Snapshot generation**: Use `cyanprint test init` to generate initial snapshots
3. **CI integration**: Create reusable workflow for consistent test execution
4. **Task automation**: Add comprehensive test tasks to root Taskfile.yaml

## Edge Cases to Handle

- **Snapshot dependencies**: Ensure all required input files exist before snapshot generation
- **Test isolation**: Each test must run independently without interference
- **Port conflicts**: Ensure tests don't interfere with each other (different ports)
- **CI timeout handling**: Set appropriate timeouts for different test types

## How to Test Independently

1. Test individual artifact builds:
   ```bash
   cyanprint test template sdks/dotnet/template
   ```
2. Test all tests for one language:
   ```bash
   task test:dotnet
   ```
3. Test all tests across all languages:
   ```bash
   task test:all
   ```
4. Validate CI configuration (nice-to-have, not a blocker):
   ```bash
   # Check workflow syntax
   gh workflow validate .github/workflows/ci.yaml
   ```

## Integration Points with Other Plans

- **Depends on Plan 1 & 2**: Test infrastructure depends on build configurations being in place
- **Final integration**: All plans work together to provide complete test coverage

## Implementation Checklist

From task-spec.md Step 4, 5, and 6:

- [ ] All 12 `test.cyan.yaml` files exist with comprehensive test cases covering all artifact features
- [ ] `snapshots/` directories exist for all 12
- [ ] Root `Taskfile.yaml` has `test:all`, `test:dotnet`, `test:node`, `test:python` tasks
- [ ] CI updated to run `cyanprint test` for all artifacts
- [ ] `task test:all` passes for all 12 combinations
