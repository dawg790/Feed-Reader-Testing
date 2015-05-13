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
                // First we check that the url property is defined
                expect(allFeeds[i].url).toBeDefined();
                // Second, we check that the url property content is not blank
                expect(allFeeds[i].url).not.toBe('');
            };
         });

         it('has a name defined', function() {
            // Loop through all indexes of the allFeeds variable
            for (var i = 0; i < allFeeds.length; i++) {
                // First we check that the name property is defined
                expect(allFeeds[i].name).toBeDefined();
                // Second, we check that the name property content is not blank
                expect(allFeeds[i].name).not.toBe('');
            };
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
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // When we trigger a second click, the menu-hidden class should be present on the body element
            $('.menu-icon-link').trigger('click');
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

        it('should successfully load entries from the API', function(done) {
            /* After the loadFeed function has run we should have feed entries added to the page in the form of
             * elements with a .entry class.
             */
            expect($('.feed .entry')).toBeDefined();
            done();
        });
    });

    /* This test suite is all about the new feed selections. When a user selects a new feed, the content on the page
     * should change to reflect the new feed.
     */
    describe('New Feed Selection', function() {

         // Store the value of a feed entry's content before simulating running loadFeed again.
         var contentBefore;

         beforeEach(function(done) {
            // We use the first index so that we can compare two different feeds
            loadFeed(1, done);
            contentBefore = $('.entry h2').text();
         });

         it('has updated the feed contents', function(done) {
            // Compare the two different feeds' content, they should not be the same.
            expect($('.entry h2').text()).not.toBe(contentBefore);
            done();
         });

    });
}());
