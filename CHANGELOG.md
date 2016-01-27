# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [0.0.2] - 2016-01-27
### Fixed
- bad definition for `EmailField`, `HiddenField`, `PasswordField` fields
- `EmailField` is not properly supported in some browsers (incl. chrome v47)
- `EmailField`, `HiddenField`, `PasswordField` accepts min_length, max_length attributes

### Added
- support of both default/allow_null options


## [0.0.1] - 2016-01-08
### Added
- django-rest-formly cli tool
- DjangoRestConfig class
- toFormlyFields function which convert django rest metadata to angular formly configuration objects
- Support of Django REST ``BooleanField``
- Support of Django REST ``CharField``
- Support of Django REST ``IntegerField``
- Support of Django REST ``EmailField``
- Support of Django REST ``PasswordField``




