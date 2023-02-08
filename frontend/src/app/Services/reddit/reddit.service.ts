import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedditPost } from 'src/app/Models/RedditPost';

@Injectable({
	providedIn: 'root'
})
export class RedditService {

	public redditPosts: RedditPost[] = [];
	public numberOfPosts: number = 10;

	public loading: boolean = false;

	constructor(private http: HttpClient) { }


	getNewestRecipePosts() {
		this.loading = true;

		fetch(`https://www.reddit.com/r/recipes/new.json?limit=${this.numberOfPosts}`)
			.then(response => response.json())
			.then(data => {
				let count = 0; //keep track of how many fetch requests there are

				//thats what it wants to do for element....
				data.data.children.forEach((element: { data: { id: string; title: string; permalink: string; preview: { images: { source: { url: string; }; }[]; }; }; }) => {
					let id = element.data.id;

					let postInfo = {
						Id: id,
						title: element.data.title,
						url: "reddit.com" + element.data.permalink,
						//may throw an error if images[0] doesn't exist...
						//I'm not sure what reddit does if there isn't a image???
						imgUrl: element.data.preview.images[0].source.url, //get the first image's url
						recipeComment: ""
					}

					this.redditPosts.push(postInfo);



					//get the comments from the post
					fetch(`https://www.reddit.com/r/recipes/comments/${id}.json`)
						.then(response => response.json())
						.then(data => {

							//console.log(data[1].data.children);

							const comments: Comment[] = data[1].data.children;

							const matchingComments: Comment[] = [];

							comments.forEach(comment => {

								/*	"t1": A comment object
										"t2": A Reddit account object
										"t3": A link post object
										"t4": A private message object
										"t5": A subreddit object */
								if (comment.kind === 't1') {
									//console.log(comment.data.body);

									const commentBody = comment.data.body;

									//split into lines 
									const lines = commentBody.split('\n');

									let foundIngredientList = false;

									//The ingredients need bullet points and the directions need numbered steps.
									//loop thru each line looking for a bullet
									
									lines.forEach(line => {
										//console.log(line, line.startsWith('•'), line.startsWith('*'))
										if (line.startsWith('•')) { 
											foundIngredientList = true;
										}
										if (line.startsWith('*')) { 
											foundIngredientList = true;
										}
										
									});
									if (foundIngredientList) {
										postInfo.recipeComment = comment.data.body; 
										//matchingComments.push(comment);
									}
								}
							});

							//this breaks the lines of the comment up to seperate out the ingredients
							// matchingComments.forEach(comment => {
							// 	const lines = comment.data.body.split('\n');
							// 	lines.forEach(line => {
							// 		if (line.startsWith('•') || line.startsWith("*")) {
							// 			//const ingredient = line.replace(/^\d+\.\s*/, '').trim();
							// 			console.log(line);
							// 		}
							// 	});
							// });



							count++;

							if (count == this.numberOfPosts) {
								this.loading = false;
								console.log("done");
							}
						})
						.catch(error => {
							console.error(error);
						});

				});

				console.log(this.redditPosts);
			})
			.catch(error => {
				console.error(error);
			});
	}

}

interface Comment {
	kind: string;
	data: CommentData;
}

interface CommentData {
	//the data has a bunch of values we only need body
	body: string;
}


