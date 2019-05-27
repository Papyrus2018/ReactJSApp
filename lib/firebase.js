
var subscribedTags = {};

const subscribeToTopic = function(topic) {
    //console.log('subscribing to ' + topic)
    FCMPlugin.subscribeToTopic(topic);
}

const unsubscribeFromTopic = function(topic) {
    //console.log('unsubscribing from ' + topic)
    FCMPlugin.unsubscribeFromTopic(topic);
}

exports.initializeFirebase = function() {
    FCMPlugin.getToken(function(token){
        console.log(token);
    });
}
exports.syncAllTags = function(tags) {
    tags.map(function(tag) {
        subscribedTags[tag.id] = false
    })
}

exports.subscribeToTags = function(tags) {
    Object.keys(subscribedTags).forEach(function(key, value) {
        return subscribedTags[key] = false;
    })
    tags.map(function(tag) {
        subscribedTags[tag] = true
    })
    for (var tag in subscribedTags) {
        if (subscribedTags[tag]) {
            subscribeToTopic(tag);
        } else {
            unsubscribeFromTopic(tag);
        }
    }
}

exports.unSubscribeFromTags = function(tags) {
    /*Object.keys(subscribedTags).forEach(function(key, value) {
        return subscribedTags[key] = false;
    })
    tags.map(function(tag) {
        subscribedTags[tag] = true
    })*/
    for (var tag in tags) {
        unsubscribeFromTopic(tag);        
    }
}