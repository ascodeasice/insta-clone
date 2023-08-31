# Commit History

The original commit history was deleted due to api key leak, so the entire repo was reset and committed again

## Content

* 89405cc (HEAD -> main) use api key in .env
* 3f89aa8 (origin/main, origin/HEAD) Fix showing follower"s" when there's only one.
* 5d485e4 Fix length of username on post. Prevent user go to ProfilePage by accident
* d9e3f45 Update README.md. Add pictures and website link.
* 70d8884 Finish placeholders of ProfilePage tab.
* a81ba1f Show followed posts first, then recommended.
* 1841da6 Finish showing following users on ProfilePage.
* cfcfb2f Fix bug of following other users.
* c427579 Finish remove follower.
* da68af2 User can follow people on more pop up of post now.
* ab77ce3 User can delete comments on their posts now.
* 2bbdaf5 Finish events on LikePopUp
* dfff5d9 Fix bug of showing saved posts to other users.
* 4227a54 Finish showing like events on LikePopUp.
* 0b58ef8 Refactor save and delete like event.
* 9973c06 Finish save and delete like events.
* 585ff9b Finish follow button on ProfilePage.
* b82fe76 Finish go to post in pop up menu.
* 07a4dd5 Finish PostPage.
* 20eda10 Show like count and comments when hovering posts.
* 4f18982 Show saved posts on ProfilePage.
* b3b0273 Delete comment document when deleting posts.
* 5f02115 Show posts on ProfilePage.
* f5654c3 Finish choosing tabs in ProfilePage. User can choose posts and saved in ProfilePage.
* f475599 Finish editing profile picture.
* 7a4c689 Fix bug of showing profile. Update to user's own profile when clicking link on others' profile.
* 306dad4 Add link to profile on posts.
* 41815d2 Finish editing profile. User can change userName,fullName, and bio.
* eb42cea Fix bug of cancelling icons in navbar. Clicking the same icon twice will go to current page now.
* a7c74d3 Fix bug of sharing post. EditPostPopUp would reset the doneSharing. Fixed by changing useEffect condition.
* c8d3fd7 Change ProfilePicture pop up. Clicking it or other icon will make it disappear.
* 6356260 Finish layout of ProfilePage info.
* e8c4aaa Fix routing of ProfilePage. Navigate to HomePage is not logged in.
* e98de13 User can delete their comments now.
* ad5ae48 Finish editing posts. User can edit text of posts now.
* b2792f3 Fix bug of deleting post. Delete image in storage when deleting posts.
* 88cc55a Finish delete posts. User can delete their own posts.
* dc2272d Fix bug of liking posts. Used uid of poster instead of current user.
* a0a6164 Finish more pop up of post.
* 47c00b4 Finish save post function.
* 46ac28d Fix bug of wrong comments on posts. It was because of key prop in map function.
* 759eaa4 Click comment icon focus comment input.
* 54a4eca Finish comment section in posts. 1. Sort comments by time 2. Show first two when hidden 3. Show all comments when not hidden 4. Allow user to comment
* 1441cd2 Finish comment input style.
* 1457a51 Finish time text of posts. Shows distance between current time and post time.
* 3996d3a Filter posts without link when getting posts. This happens when uploading image is interrupted.
* ee617d0 Save like state after refresh. Change like count in front end, instead of fetching.
* 39b110b Finish unlikePost function.
* 042c205 Finish likePost function.
* 10ede3f Sort posts by time, and re-render when posting.
* 2093e70 Fix useEffect in FeedPage. It kept re-rendering, causing firebase quota exceeded.
* d224e53 Finish post text.
* 2e4b22a Finish like count on posts.
* c1f22c5 Finish icon bar on posts.
* 0218869 Finish PostHeader.
* 5859c55 Organize files of firebase modules. Seperate them by usage in files.
* 4b368f8 Finish savePostData function.
* ade6cdd Finish loader of posting.
* 1958fed Finish Save post data.
* e6681e1 Finish AddPostPopUP. Posting is still not finished.
* a418260 finish uploading image pop up page.
* d6de807 Finish dark background. Cover whole screen and go back to home page when clicked.
* 7ab9830 Click like icon shows pop up.
* e7d0675 Fetch user data from firestore.
* ed38a56 Save user's data when first logged in.
* 3227a4f Finish layout of FeedPage.
* 332ff52 Finish color changing on nav bar. Clicking icons will change their colors.
* 633d77c Finish testing Login link.
* cf22457 Finish sign up with google. Click log in with google button will log in.
* c54f276 Finish styling of SignUpPage.
* de0079b Finish UserContext. getUser() is still not done.
* f3601a4 Set up firebase
* 355fb94 Create react app. Set up folders.
* 6e22c57 Initial commit
