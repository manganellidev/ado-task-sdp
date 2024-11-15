build:
	@echo "Building the project"
	@cd torremo && npm run build && cd ..

bump-version: build
	@echo "Incrementing version number"
	@jq '.version |= (split(".") | .[2] |= (tonumber + 1 | tostring) | join("."))' vss-extension.json > tmp.json && mv tmp.json vss-extension.json
	@jq '.version.Patch |= (. + 1)' torremo/task.json > tmp.json && mv tmp.json torremo/task.json

create-ado-extension: bump-version
	@echo "Creating ADO extension"
	@npx tfx-cli extension create --manifests vss-extension.json --output-path torremo-azure-task.vsix

share-ado-extension:
	@echo "Sharing ADO extension"
	@npx tfx-cli extension share --extension-id torremo-azure-task --publisher SDP --share-with wagner81700610 --token 4Hx7ybCeP01VFYeB7ShR56CzoCQQfKEGlOcr7YKFHuzlyOldnaiZJQQJ99AKACAAAAAAAAAAAAAGAZDOSeBX

show-ado-extensions:
	@echo "Listing ADO extensions"
	@npx tfx-cli extension show --publisher SDP --extension-id torremo-azure-task --token 4Hx7ybCeP01VFYeB7ShR56CzoCQQfKEGlOcr7YKFHuzlyOldnaiZJQQJ99AKACAAAAAAAAAAAAAGAZDOSeBX

publish-ado-extension: create-ado-extension
	@echo "Publishing ADO extension"
	@npx tfx-cli extension publish --vsix torremo-azure-task.vsix --token 4Hx7ybCeP01VFYeB7ShR56CzoCQQfKEGlOcr7YKFHuzlyOldnaiZJQQJ99AKACAAAAAAAAAAAAAGAZDOSeBX