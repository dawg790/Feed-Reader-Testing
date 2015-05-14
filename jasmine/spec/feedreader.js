/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            // First, the allFeeds variable should be defined
            expect(allFeeds).toBeDefined();
            // Second, we test that the array has content
            expect(allFeeds.length).not.toBe(0);
        });

         it('has URLs defined', function() {
            // Loop through all indexes of the allFeeds variable
            for (var i = 0; i < allFeeds.length; i++) {
                var url = allFeeds[i].url;
                // First we check that the url property is defined as a string
                expect(typeof url).toBe("string");
                // Second, we check that the url property content is not blank
                expect(url.length > 0).toBe(true);
            }
         });

         it('has a name defined', function() {
            // Loop through all indexes of the allFeeds variable
            for (var i = 0; i < allFeeds.length; i++) {
                var name = allFeeds[i].name;
                // First we check that the name property is defined as a string
                expect(typeof name).toBe("string");
                // Second, we check that the name property content is not blank
                expect(name.length > 0).toBe(true);
            }
         });
    });

    /* This test suite is all about the Menu functions, and whether it hides and appears
     * as expected when the icon is clicked
     */
    describe('The Menu', function() {

         it('is hidden by default', function() {
            // When the page loads, the body element should have a menu-hidden property.
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

          it('is shown and hidden when the icon is clicked', function() {
            // When we trigger a button click, the menu-hidden class should not be present on the body element
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // When we trigger a second click, the menu-hidden class should be present on the body element
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* This test suite is all about the Initial entries that get loaded to the page. The API should successfully
     * load feeds when the loadFeed function is completed.
     */
    describe('Initial Entries', function() {

        // Run a beforeEach loop on the loadFeed function since this test is working with an asynchronous script
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should successfully load entries from the API', function() {
            /* After the loadFeed function has run we should have feed entries added to the page in the form of
             * elements with a .entry class.
             */
            expect($('.feed .entry')).toBeDefined();
        });
    });

    /* This test suite is all about the new feed selections. When a user selects a new feed, the content on the page
     * should change to reflect the new feed.
     */
    describe('New Feed Selection', function() {

         // Store the value of the first feed's html globally so it's available in our it function.
         var contentBefore;

         beforeEach(function(done) {
            // Load a feed and store it's HTML to contentBefore
            loadFeed(1, function() {
                contentBefore = $('.feed').html();
            });

            // Load a second feed so we can use it to compare - then call done();
            loadFeed(0, done);

         });

         it('has updated the feed contents', function() {
            // Compare the two different feeds' content, they should not be the same.
            expect($('.feed').html()).not.toBe(contentBefore);
         });

    });
}());
