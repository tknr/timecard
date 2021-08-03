#!/bin/bash
cd `dirname $0`

if !(type "npm" > /dev/null 2>&1); then
	if (type "dnf" > /dev/null 2>&1);then
		sudo dnf install npm -y || exit 1
	elif (type "yum" > /dev/null 2>&1);then
                sudo yum install npm -y || exit 1
	elif (type "apt" > /dev/null 2>&1);then
                sudo apt install npm -y || exit 1
        else
		exit 1
	fi
fi

npm install || exit 1
npx npm-check-updates -u || exit 1

if !(type "brew" > /dev/null 2>&1); then
	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)" || exit 1
fi

if !(type "cwebp" > /dev/null 2>&1); then
	brew install webp || exit 1
fi
