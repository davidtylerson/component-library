# component-library

## Development Commands

This project uses [mise](https://mise.jdx.dev/) for task management. Below are the available commands:

### Build
```bash
mise build
```
Build the project.

### LLM Tasks
The following LLM-powered development tasks are available:

```bash
mise llm_bundle
```
LLM-powered bundling task.

```bash
mise llm_code_review
```
Run an LLM-powered code review.

```bash
mise llm_copy
```
LLM copy task.

```bash
mise llm_github_issues
```
LLM task for GitHub issues management.

```bash
mise llm_missing_tests
```
Identify missing tests using LLM.

```bash
mise llm_readme
```
Generate or update README using LLM.

### Running Tasks
You can run any task using either:
```bash
mise run <task_name>
# or the shorthand:
mise <task_name>
```

To see all available tasks:
```bash
mise tasks
```