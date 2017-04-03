publish:
	-git branch -D release
	git checkout -b release && git add -f dist/ && git commit -am "Update dist for release"
	git push -f origin release
	npm publish
	git checkout -
	git branch -D release
	git push
	git push --tags