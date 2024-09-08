---
title: Contributing
description: Guidelines for contributing to Gzond

id: go-zond-geth-contribution
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Contributing
sidebar_position: 3
pagination_label: Contributing
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/dev/geth-dev/contribution
---

We welcome contributions from anyone on the internet, and are grateful even for small fixes!

## Contributing to the Gzond source code \{#contributing-to-source-code}

If you'd like to contribute to the Gzond source code, please fork the [GitHub repository](https://github.com/zond/go-zond), fix, commit and send a pull request for the maintainers to review and merge into the main code base. If you wish to submit more complex changes though, please check up with the core devs first on our Discord Server to ensure those changes are in line with the general philosophy of the project and/or get some early feedback which can make both your efforts much lighter as well as our review and merge procedures quick and simple.

Please make sure your contributions adhere to our coding guidelines:

- Code must adhere to the official Go formatting guidelines (i.e. uses gofmt).
- Code must be documented adhering to the official Go commentary guidelines.
- Pull requests need to be based on and opened against the master branch.
- Commit messages should be prefixed with the package(s) they modify.
  E.g. "zond, rpc: make trace configs optional"

Pull requests generally need to be based on and opened against the `master` branch, unless by explicit agreement because the work is contributing to some more complex feature branch.

All pull requests will be reviewed according to the [Code Review guidelines](/docs/developers/gzond-developer/code-review-guidelines).

We encourage an early pull request approach, meaning pull requests are created as early as possible even without the completed fix/feature. This will let core devs and other volunteers know you picked up an issue. These early PRs should indicate 'in progress' status.

## Contributing to the Gzond website \{#contributing-to-website}

The Gzond website is hosted on a separate branch of `go-zond` from the source code. To contribute, please check out the website branch and raise pull requests for the maintainers to review and merge. Please note that new pages added to the site must also be added to `/src/data/documentation-links.yaml` in order for it to be included in the navigation sidebar. Additional contribution guidelines are available in the website [README](https://github.com/zond/go-zond/tree/website#readme).

## License \{#license}

The go-zond library (i.e. all code outside of the cmd directory) is licensed under the GNU Lesser General Public License v3.0, also included in our repository in the COPYING.LESSER file.

The go-zond binaries (i.e. all code inside of the cmd directory) is licensed under the GNU General Public License v3.0, also included in our repository in the COPYING file.
