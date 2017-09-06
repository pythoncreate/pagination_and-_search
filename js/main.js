var listStudents = $(".student-list li");
var numStudents = listStudents.length;
let currentList = listStudents;


function showPage(pageNum, listStudents) {
    // first hide all students on the page
    pageNum = parseInt(pageNum);
    listStudents.hide();
    // Then loop through all students in our student list argument
    listStudents.each(function(index){
    // if student should be on this page number
        if ((index >= ((pageNum*10)-9)) &&  (index <= (pageNum*10))) {
       	// show the student
       	    $(this).show();
       	    }
     currentList= listStudents;
    });

 }

function getNumPages(numStudents){
    numPages = Math.ceil(numStudents/10);
    return numPages;
    }


function appendPageLinks(numStudents) {
    // determine how many pages for this student list
    pages  = getNumPages(numStudents);
    // create a page link section
    var nav = "<div class='pagination'><ul>"
    for (i=1; i<pages+1; i+=1){
        nav += ("<li>" + "<a href='#' id=" + i + ">" + i + "</a>" + "</li>");
    };
    nav += ("</ul></div>");
    $(".student-list").after(nav);

    // define what happens when you click a link
    var active = $('.pagination a').click(function(){
        // Use the showPage function to display the page for the link clicked
        var id = $(this).attr('id');
        showPage(id,listStudents);
        // mark that link as “active”
        active.removeClass('active');
        $(this).addClass("active");
        });
}

function appendSearchBox(){
    var search = "<div class='student-search'><input id='search' placeholder='Search for students...'><button>Search</button></div>"
    $(".students").after(search);

    // Add click event handler
	$("button").click(function() {
		searchList();
	});

}

function searchList() {
    var matched = [];
    // Obtain the value of the search input
    input = $("#search").val()
    // remove the previous page link section
    $('.pagination').hide();
    // Loop over the student list, and for each student…
    listStudents.each(function(){
        // ...obtain the student’s name…
        var name = $(this).find("h3").val();
        // ...and the student’s email…
        var email = $(this).find(".email").val();
        // ...if the search value is found inside either email or name…
        if (name.includes(input) || email.includes(input))  {
             // ...add this student to list of “matched” student
             matched.push($(this).parent());
             }
     });
     // If there’s no “matched” students…
     if (matched.length === 0){
         // ...display a “no student’s found” message
            var message = ("Sorry, no student's found!");
            $(".student-list").hide();
            $(".student-list").after(message);

     if (matched.length > 10) {
        // ...call appendPageLinks with the matched students
        appendPageLinks(matched);
        }
        // Call showPage to show first ten students of matched list
        showPage(1, matched);
     }


}

appendSearchBox();
showPage(1, listStudents);
appendPageLinks(numStudents);