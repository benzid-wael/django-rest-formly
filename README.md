# django-rest-formly

[![npm version](https://img.shields.io/npm/v/django-rest-formly.svg?style=flat-square)](https://www.npmjs.org/package/django-rest-formly)
[![npm downloads](https://img.shields.io/npm/dm/django-rest-formly.svg?style=flat-square)](http://npm-stat.com/charts.html?package=django-rest-formly&from=2016-01-01)
[![Build Status](https://travis-ci.org/benzid-wael/django-rest-formly.svg)](https://travis-ci.org/benzid-wael/django-rest-formly)
[![David](https://img.shields.io/david/benzid-wael/django-rest-formly.svg)](https://david-dm.org/benzid-wael/django-rest-formly)
[![David](https://img.shields.io/david/dev/benzid-wael/django-rest-formly.svg)](https://david-dm.org/benzid-wael/django-rest-formly)


## How to install

Just install it with `npm`:

        npm install -g django-rest-formly

This will install `django-rest-formly` globall and let you using the cli tool from anywhere.

** P.S: ** It's recommended to use ``VerboseMetadata`` class of 
[djangorestframework-utils](https://github.com/benzid-wael/django-rest-framework-utils) package, to explore all features
of this project.

## Usage

This package install a command line tool that let you render ``angular-formly`` fields' configuration for your
`Django Rest Framework` endpoints.

### Arguments

- ``-h, --host <HOST>``
  Specifies host address (by default: 127.0.0.1)
- ``-p, --port <PORT>``
  Specifies port number (by default 8000)
- ``--root <PATH>``
  Specifies API root path (by default '/')
- ``-c, --color``
  Colorize the command output, this had effect only on ``list`` command or ``form`` command whent it's used with
  ``--prettify`` option
- ``--prettify``
   Prettify the json output

### Listing endpoint

The command `list` will list all existing endpoints for the specified API root (by default '/'). You can specify the API
root with `--root` option. Note also, that you can change host (resp. port) value with `--host` (resp. `--port`) option.

```shell
$ django-rest-formly --host 192.168.99.100 --port 5000 --root /api
```

### Generate Formly form configuration

The command `form` will generate `angular-formly`'s form configuration for the specified endpoint, example:

```shell
$ django-rest-formly --host 192.168.99.100 --port 5000 --root /api users
```

The output will be the form's configuration for endpoint located on `192.168.99.100:5000/api/users`

## Project Status

The project is already in development status, and not all fields are supported and there is a lot of things to improve.
For the moment, we support the below fields:

- IntegerField
- BooleanField
- CharField
- EmailField (``HTML5``)
- PasswordField
- RegexField (``HTML5``)
- URLField (``HTML5``)
- IPAddressField (``HTML5``)
- DecimalField
- FloatField
- DateField (``HTML5``)
- TimeField (``HTML5``)
- DateTimeField (``HTML5``)

For further details, see [Change Log](CHANGELOG.md).


## Contributing

Contributions are welcome and appreciated. You can find [django-rest-formly](https://github.com/benzid-wael/django-rest-formly)
on GitHub, feel free to start an issue or create a pull requests.
