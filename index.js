import { Wasteof2Auth, Wasteof2 } from 'wasteof-client'

let username = 'evalbot';
let password = 'badpassword';
const wasteof = new Wasteof2Auth(username, password);
const wastatic = new Wasteof2();

await wasteof.login()
wasteof.listen(async (event) => {
    if (event.type == 'updateMessageCount') {
	await wastatic.getWallComments(username, 0)
	    .then(data => {
		console.log("updating");
		replyToComment(data.comments[0]);
	    });
    }
});

async function replyToComment(comment) {
  if (!comment) return;
  let postername = comment.poster.name; // username the one leaving the comment
  let posterid = comment.poster.id; // id of the one leaving the comment
  let content = comment.content; // content of the comment
  let commentid = comment._id; // id of the comment
  let time = comment.time; // timestamp of the comment
  let responded = false; // if the bot already responded

 	await wastatic.getRepliesToComment(commentid, 0)
  .then(data => {
    if (!data[0]) return;
    if (data[0].poster.name == username) responded = true;
  })
	var evalStatement = content.slice(3,content.length-4).split("</p><p>").join("\n").split("&lt;").join("<").split("&gt;").join(">").split("—").join("--");
	delete require;
	delete import;
	try {
  var evalResult = eval(evalStatement);
	console.log(evalStatement);
} catch (e) {
	var evalResult = e;
}
	if (!evalResult) {
		evalResult = "You didn't return anything!";
	}
	console.log(evalStatement);
	console.log(evalResult);
	

  /* DO STUFF HERE */
  if (responded) return; // if the bot already responded to the comment, stop the function
  wasteof.postWallComment(username, evalResult.toString(), commentid); // reply to the comment
}
