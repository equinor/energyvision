# How to create good User Stories

Copied from [this excelent article](https://manifesto.co.uk/how-much-detail-should-a-user-story-have/).

There’s a fine balance to be struck between user stories which don’t have enough detail, leaving teams confused, and user stories which have too much detail, prescribing solutions to the challenge being described. The most important thing to remember when writing user stories is that they need to be valuable and negotiable i.e. they’re the starting point for a conversation between the development team and the business, not a contract for a specific feature.

## User stories with too little detail don’t encapsulate user value
Take the following [user story](http://manifesto.co.uk/agile-concepts-user-stories/) example:


```
As a user I want to sign in with my Facebook account
```

This sounds fairly self-explanatory until you think about it for a moment. What kind of user? And what benefit will they derive from being able to sign in via Facebook? Is it just to avoid the need to remember a separate password, or will there be additional value?

The author here has forgotten that the user story is meant to encapsulate a little chunk of value. Without describing how value is created the story is too vague. The business presumably knows why it wants users to be able to sign in with Facebook but the benefit has not been captured here.

## User stories with too much detail shut down conversations
Take the following example of a user story:


```
As a subscriber I want to sign in with my Facebook account so that my friends can follow my activity.

Note: When signed in with Facebook user’s profile image should be imported.
``` 

‘Facebook’ tab in settings with ability to turn auto-share on/off. Friends should be imported as both ‘followed’ and ‘followers’ where they have accounts. Failure of FB sign in should prompt user to register?
This user story very likely has too much detail. While the user and benefit have been specified, helping to describe the value that the feature brings, the further details are dangerously specific and the stuff about the settings probably belongs in a separate user story.

The problem with too much detail is that the developer is encouraged to think that all the questions around the feature have already been settled, that there’s no more room for conversation with the business and that delivery is a simple matter of ticking the boxes. But user stories, remember, have to be negotiable. It’s the best way to make space for creative thinking and the best way of avoiding having to go back and rework stuff later.

If there are elements that are decisive as to whether the feature delivers value or not (e.g. friend import) then these constitute tests of the feature and should be incorporated as acceptance criteria, but not as part of the story description. For example

```
User story:
As a subscriber I want to sign in with my Facebook account so that my friends can follow my activity.

Note: Consider case when FB sign in fails

Acceptance criteria:
Facebook profile image imported
Friends imported as ‘followed’ and ‘follower’
```

I’ve worked with many organisations that specify in much more detail than this. Sometimes this helps, but often it’s used after the fact to find out who specified or decided certain things. Trying to use user stories as an audit trail, or as a stick to beat people with, is a behaviour you want to avoid in Agile teams. Even if you find a specification for a user story it may have been affected by a subsequent one.

## Conclusion
A user story should be written with the minimum amount of detail necessary to fully encapsulate the value that the feature is meant to deliver. Any specifications that have arisen out of conversations with the business thus far can be recorded as part of the [acceptance criteria](http://manifesto.co.uk/agile-concepts-user-stories/).

Of course, the user story will have to meet the team’s [definition of ready](http://manifesto.co.uk/the-definition-of-ready/) before it can be incorporated into a sprint and this may or may not include some UX work (depending on whether UX is done [during or ahead of sprint](http://manifesto.co.uk/agile-ux/)).

If the organisational concern is to keep a certain level of solution documentation it’s much better to do this at an [epic](http://manifesto.co.uk/agile-concepts-user-stories/) level and update as each story affects the epic. And remember that all documentation should itself deliver value for someone e.g. an editorial or support team.

## Other resources
https://www.visual-paradigm.com/guide/agile-software-development/what-is-user-story/