var gmail;


function refresh(f) {
    if ((/in/.test(document.readyState)) || (typeof Gmail === undefined)) {
        setTimeout('refresh(' + f + ')', 10);
    } else {
        f();
    }
}


var main = function() {
    // NOTE: Always use the latest version of gmail.js from
    // https://github.com/KartikTalwar/gmail.js
    gmail = new Gmail();
    console.log('Hello,', gmail.get.user_email());

    if (typeof gapi !== undefined) {
        // gapi.client.load('gmail', 'v1', function() {
        //     var request = gapi.client.gmail.users.labels.list({
        //         'userId': 'me'
        //     });
        //
        //     request.execute(function(resp) {
        //         var labels = resp.labels;
        //         if (labels) {
        //             console.log('Labels:', labels);
        //         } else {
        //             console.log('No Labels found.');
        //         }
        //     });
        // });
    } else {
        console.log('no gapi');
    }


    // gmail.tools.add_toolbar_button('<span role="button">Boo</span>', function() {
    //     gmail.tools.add_modal_window('Test Popp', 'Do you want to continue?',
    //         function() {
    //             //cleanMyInbox();
    //             gmail.tools.remove_modal_window();
    //         });
    // }, 'T-I J-J5-Ji nX T-I-ax7 T-I-Js-Gs T-I-Js-IF ar7');

    gmail.observe.after('open_email', function(id, url, body, xhr) {
        //console.log("id:", id, "url:", url, 'body', body, 'xhr', xhr);
        //#\3a 2 > div > div:nth-child(2) > div > table > tr > td.Bu.y3
        var el = document.querySelector('tr > td.Bu.y3');
        if (el) {
            //console.log('set none', el);
            el.hidden = true;
        }

        var thread = gmail.get.email_data(id);
        console.log('thread',thread);
        var emaildom = new gmail.dom.email(id);
        console.log('emaildom',emaildom);
        var tow = emaildom.from();
        console.log('tow',tow);

        for(var i =0; i < thread.total_emails; i++){
             var msgid = thread.total_threads[i];
             var msg = thread.threads[msgid];
             if(msg.reply_to_id === id){
               var msgr = thread.threads[msg.reply_to_id];
               console.log('Replied To', msg.reply_to_id,msgr.subject,msgid,msgr.subject);
               //tow[0].name = tow[0].name + '(Replied To)';
               //tow.name ='(Replied To)';
               //tow.email ='Replied To';
               emaildom.from(tow.email,tow.name + ' (Replied To)');

               break;
             }

             //console.log(msgid,msg);

           }

    });

    // gmail.observe.on('view_thread', function(obj) {
    //   console.log('conversation thread opened', obj); // gmail.dom.thread object
    //   var elx = new gmail.dom.email(obj);
    //   console.log('elx',elx);
    //   var thread = elx.data();// gmail.get.email_data(obj.id);
    //     console.log(thread);
    //
    //   //  var email = obj;
    //   //  var email = new gmail.dom.email(thread.thread_id);
    //     var tow = elx.from();
    //     console.log(tow);
    //
    //
    //     for(var i =0; i < thread.total_emails; i++){
    //       var msgid = thread.total_threads[i];
    //       var msg = thread.threads[msgid];
    //       if(msg.reply_to_id === id){
    //         var msgr = thread.threads[msg.reply_to_id];
    //         console.log(msg.reply_to_id,msgr.subject,msgid,msgr.subject);
    //         //tow[0].name = tow[0].name + '(Replied To)';
    //         tow.name ='(Replied To)';
    //         e.x.from(tow);
    //         break;
    //       }
    //
    //       //console.log(msgid,msg);
    //
    //     }
    //
    // });

    gmail.observe.on_dom('compose', function(message, what,c,d) {
        console.log('before compose', what, message);
        console.log(message.id(), message.from(), message.to());


    });

};


refresh(main);
