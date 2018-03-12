## Resolve

The `resolve` option can be used to pass one or more custom resolver functions.

| Key | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| templateFile | Function | No | undefined | Resolve template file to use from entry |
| fileType | Function | No | undefined | Determine file type from entry |
| folderType | Function | No | undefined | Determine folder type from entry |
| entityType | Function | No | undefined | Determine entity type from entry |
| params | Function | No | undefined | Determine params to use for entry |
| templateRenderer | Function | No | undefined | Create custom template renderer |
| normalizePath | Function | No | undefined | Strip off template extension from filePath |
