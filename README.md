## Install packages
Run `npm install` to install requirements packages.

## How to run the tests
There are two ways to run the tests:

1) Using script by:
    - Call the `npm run chrome` on the command line to run the tests on Chrome browser.
    - Call the `npm run remote` on the command line to run the tests on any browser at any local remote meshing (e.g. Mobiles, Mac).
    - Then you can see the test result on `e2e/assets/result/` directory as a html page.
2) Manually call Testcafe from the command line. see [Install TestCafe](https://devexpress.github.io/testcafe/documentation/guides/basic-guides/install-testcafe.html) and [Run TestCafe](https://devexpress.github.io/testcafe/documentation/guides/basic-guides/run-tests.html).
    - e.g. `testcafe chrome search.ts`

## Note
   - The method of `hasCorrectSort` is applicable for all sort items, except `Latest listings first` item, which is need to connect to the API for check.
   - The method of `filterRegYear` can apply the both values (`FROM` and `TO`) into `First Registration` filter area.
