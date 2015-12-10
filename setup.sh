#!/bin/sh
ISERROR=0

which npm > /dev/null 2>&1
if [ $? -ne 0  ] ; then
		echo "command not found: npm"
			echo "please install npm. e.g. sudo port install npm"
				ISERROR=1
			fi

			which gulp > /dev/null 2>&1
			if [ $? -ne 0  ] ; then
					echo "command not found: gulp"
						echo "please install gulp. e.g. npm install -g gulp"
							ISERROR=1
						fi

			which tsd > /dev/null 2>&1
			if [ $? -ne 0  ] ; then
					echo "command not found: tsd"
						echo "please install tsd. e.g. npm install -g tsd"
							ISERROR=1
						fi

			which mocha > /dev/null 2>&1
			if [ $? -ne 0  ] ; then
					echo "command not found: mocha"
						echo "please install mocha. e.g. npm install -g mocha"
							ISERROR=1
						fi

						if [ $ISERROR == 1  ] ; then
								exit
							fi

							rm -rf .sass-cache bower_components bower-task node_modules tsd-cache && \
								npm install && \
								tsd install && \
								echo "OK!"
