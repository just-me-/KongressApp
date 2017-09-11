var serverOnly_adminUser         = "Admin";
var serverOnly_adminPassword     = "1234";

var serverOnly_modUser           = "Moderation";
var serverOnly_modPassword       = "12";

// Protecting admin and mod urls
var basicAuthAdmin = new HttpBasicAuth(serverOnly_adminUser, serverOnly_adminPassword);
basicAuthAdmin.protect(['/admin_program', '/admin_speaker', '/admin_sponsor', '/admin_room', '/keynote']);

var basicAuthMod = new HttpBasicAuth(serverOnly_modUser, serverOnly_modPassword);
basicAuthMod.protect(['/keynote_mod', '/keynote_answers']);
