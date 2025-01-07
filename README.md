# TonyKrishna-SDETAssessment
This repo contains answer to questions including test framework

## Question 1,2,3
Solutions for Questions 1,2,3 are available in the file 

## Question 4 - Test Framework
### About the framework
The test framework aims to create Playwright and TypeScript based automated test solution for test_server project.

The test_server system is web only and all our functionality and tests work within the browser, the Playwright is a great tool to create automated solutions for front end UI, functionality testing. Playwright stands out when it comes to Cross-browser testing, auto-wait mechanism, locating elements, headless and headed mode for faster execution along with the Test runner and test reporting capabilities, all of which are easy to use that makes scaling anf maintenance an easier effort.

The framework is setup is Page Object Model fashion, which allows adding new tests easier and faster. Tests can be added to corresponding test files and all the functions and locators are abstracted to Pages file.

The reporting uses Playwrights inbuilt reporting mechanism which gives a comprehensive, easy to read and understand report with screenshots.

### Installation
Please follow the step below for setting up the project locally

    1. Clone the project repository to local 
            git clone https://github.com/tonyKrish/TonyKrishna-SDETAssessment.git 
            
    2. Navigate into project directory
            cd TonyKrishna-SDETAssessment
    
    3. Install required dependencies
            -   npm install  or yarn install
            -   npx playwright install
    
    4. Run the Tests
            To run tests only Chrome use : npx playwright test --project="chromium"
            To show report for the last run : npx playwright show-report
            Run a specific test : npx playwright test tests/<testfile>.test.ts -g "theNameOfTest"

### Add a new test
A test can be added to test files or a new file created under **tests** folder

The functions and locators should be added to corresponding page file in **pages** folder

The newly added pages should be added to testFixtures **base/testfixtures.ts**

Test data is added to json file **test-data/testData.json**

LoginPage tests are a good reference point on how the structure of a new test should be.

### Assumptions and other FYI
It is assumed the test_server doesn't have any bugs. 
The home page is considered to include Tour, Contact, Ticket purachse sections within it and hence a single page for all that functionalities.
The tests are executed in headed mode, it can be changed in config file.
Test data is saved in testData.json, the data is not dynamically created by tests due to smaller size of test data set.
All the Scenarios mentioned in Question 3 has been implemented for login page. Home page has basic tests required for a regression test.

PS : Thank you for considering me for the role and I'm excited about the opportunity. Looking forward to receive the feedback and appreciate the time taken to review this assessment.

Thanks and Regards - Tony Krishna



