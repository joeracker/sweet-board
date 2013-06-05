'use strict';

angular.module('SweetBoardServices', ['ngResource']).
    factory('Messages', function($resource) {
        return $resource('/api/:action/:message_id', 
            { },
            {
                list: {  method:'GET', isArray: true, params: { action: 'messages.json'} },
                message: function(sid) { return { method:'GET', isArray:true, params: { action: 'message', sid: sid} } }
            }
        );
	}).
    factory('MessageData', function(Messages, Sounds, $rootScope) {
        return {
            messages: [],
            UPDATE_INTERVAL: 10000,
            updateLocalMessages: function () {
                $rootScope.MessageData = this;
                
                var successAction = function(data) {
                    var temp_messages = data;
                    var MessageData = $rootScope.MessageData;
                    
                    var new_messages = _.filter(temp_messages, function(v, i, c) {
                        return (_.where(this.messages, {'sid': v["sid"]}).length == 0);
                    }, MessageData);
                    
                    if (new_messages.length > 0) {
                        Sounds.playSound("/static/sounds/smb_coin.mp3");
                        MessageData.messages = new_messages.concat(MessageData.messages);
                    }
                };
                
                Messages.list(successAction);
            },
            getMessages: function () {
                if (this.messages.length == 0) {
                    this.updateLocalMessages();
                }
                
                return this.messages;
            }
        };
    }).
    factory('TickerList', function (MessageData) {
        return {
            TICKER_DELAY: 5000,
            messageIndex: undefined,
            incrementMessage: function () {
                if ((this.messageIndex === undefined) || (this.messageIndex >= MessageData.messages.length)) {
                    this.messageIndex = 0;
                } else if (this.messageIndex + 1 < MessageData.messages.length) {
                    this.messageIndex += 1;
                } else {
                    this.messageIndex = 0;
                }
                
                return this.messageIndex;
            },
            getCurrentMessage: function () {
                if (MessageData.messages[this.messageIndex]) {
                    return MessageData.messages[this.messageIndex].body;
                } else {
                    return "";
                }
            }
        };
    }).
    factory('Sounds', function () {
        return {
            playSound: function (sound_file) {
                var aud_con = document.createElement("audio");
                aud_con.setAttribute("autoplay", "true");
            
                var aud_src = document.createElement("source");
                aud_src.setAttribute("src", sound_file);
                aud_src.setAttribute("type", "audio/mpeg");
            
                aud_con.appendChild(aud_src);
            }
        };
    });