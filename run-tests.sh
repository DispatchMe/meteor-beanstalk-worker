#!/bin/bash
if [ "$1" == "ci" ]
then
  PACKAGE_DIRS=./packages velocity test-package ./ --port 5000 --ci --driver-package=velocity:html-reporter@0.9.0-rc.1
else
  PACKAGE_DIRS=./packages velocity test-package ./ --port 5000 --driver-package=velocity:html-reporter@0.9.0-rc.1
fi
