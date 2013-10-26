var request = require('request');
// var urllib = require('url');
var path = require('path');
var cheerio = require('cheerio');
var fs = require('fs');
var markdown = require("markdown-js");

_urls =[
"http://blog.dakarlug.org/2013/08/14/\
apres-midi-17-aout-2013-pour-reparer-dakarlug/",
"http://blog.dakarlug.org/2013/06/03/\
conference-et-ateliers-logiciels-libres-et-education/",
"http://blog.dakarlug.org/2013/05/07/\
dakarlug-fete-ubuntu-1304/",
"http://blog.dakarlug.org/2013/05/06/\
la-revolution-numerique-leconomie-de-limmateriel/",
"http://blog.dakarlug.org/2012/09/10/\
software-freedom-day-5e-edition-dakar/",
"http://blog.dakarlug.org/2012/08/01/\
soiree-logiciel-libre-11-aout-2012/",
"http://blog.dakarlug.org/2012/05/25/\
dakarlug-soutient-la-1ere-journee-linux-et-logiciels-libres-ziguinchor/",
"http://blog.dakarlug.org/2012/05/11/\
linux-party-de-mai-2012-caravane-ubuntu-et-install-party/",
"http://blog.dakarlug.org/2012/03/30/\
serie-datelier-de-formation-python/",
"http://blog.dakarlug.org/2011/10/10/blender/",
"http://blog.dakarlug.org/2011/09/13/sfd2011/",
"http://blog.dakarlug.org/2011/07/05/\
coding-party-juillet-2011/",
"http://blog.dakarlug.org/2011/05/31/\
libre-design/",
"http://blog.dakarlug.org/2011/04/29/\
mozilla-days/",
"http://blog.dakarlug.org/2011/03/15/\
bilan-francophonie-logiciels-libres/",
"http://blog.dakarlug.org/2011/03/10/\
journes-de-la-francophonie-sur-les-logiciels-libres/",
"http://blog.dakarlug.org/2011/01/31/\
bilan-apres-midi-linux-290111/",
"http://blog.dakarlug.org/2011/01/10/\
premiere-activite-de-lannee-2011/",
"http://blog.dakarlug.org/2011/01/01/\
dakarlug42/",
"http://blog.dakarlug.org/2010/11/27/\
dakarlug-soutient-le-barcamp/",
"http://blog.dakarlug.org/2010/10/04/\
dimanche-42/",
"http://blog.dakarlug.org/2010/09/22/\
lafter-sfd2010/",
"http://blog.dakarlug.org/2010/09/01/\
sfd2010/",
"http://blog.dakarlug.org/2010/05/19/\
apres-midi-linux-29-mai/",
"http://blog.dakarlug.org/2010/03/11/\
apres-midi-linux-le-20-mars-2010/",
"http://blog.dakarlug.org/2010/02/15/\
atelier-sur-puredata-le-20-fevrier-2010/",
"http://blog.dakarlug.org/2009/12/23/\
apres-midi-libre-le-9-janvier-2010-lesmt/",
"http://blog.dakarlug.org/2009/12/21/\
on-s-habille/",
"http://blog.dakarlug.org/2009/09/30/\
sfd-2009-resume/",
"http://blog.dakarlug.org/2009/09/10/\
softwarefreedomday-2009-au-senegal/",
"http://blog.dakarlug.org/2009/07/29/\
django-11-party-le-samedi-8-aot-2009/",
"http://blog.dakarlug.org/2009/07/13/\
python-african-tour-updates/",
"http://blog.dakarlug.org/2009/07/10/\
python-african-tour-senegal-la-fin-du-tunnel/",
"http://blog.dakarlug.org/2009/06/30/\
conference-python-mercredi-8-juillet-10h-a-lespucad/",
"http://blog.dakarlug.org/2009/06/15/\
resume-ubuntu-install-party-du-13062009/",
"http://blog.dakarlug.org/2009/06/04/\
ubuntu-install-party13062009/",
"http://blog.dakarlug.org/2009/05/25/\
python-party-resume/",
"http://blog.dakarlug.org/2009/05/08/\
python-party-23052009/",
"http://blog.dakarlug.org/2009/04/30/\
python-african-tour-etape-senegalaise/",
"http://blog.dakarlug.org/2009/04/19/\
compte-rendu-de-linstall-party-du-18-avril/",
"http://blog.dakarlug.org/2009/04/07/\
rendez-vous-ce-18-avril/",
"http://blog.dakarlug.org/2009/04/01/\
apres-midi-linux-samedi-18-avril-2009/",
"http://blog.dakarlug.org/2009/03/23/\
compte-rendu-de-lapres-midi-linux-du-19-20-mars-2009/",
"http://blog.dakarlug.org/2009/03/13/\
apres-midi-linux-et-logiciels-libres-2/",
"http://blog.dakarlug.org/2009/02/16/\
journee-linux-et-logiciels-libres/",
"http://blog.dakarlug.org/2009/02/10/\
quelques-nouvelles-pas-toutes-neuves/",
"http://blog.dakarlug.org/2009/01/30/\
resume-seance-de-prise-en-main-ubuntu-linux/",
"http://blog.dakarlug.org/2009/01/28/\
prise-en-main-ubuntu-29-janvier-2009/",
"http://blog.dakarlug.org/2009/01/22/\
resume-apres-midi-linux-et-logiciels-libres17012009/",
"http://blog.dakarlug.org/2009/01/07/\
apres-midi-linux-et-logiciels-libres/",
"http://blog.dakarlug.org/2008/11/24/\
formation-utilisation-du-systeme-ubuntu-linux/",
"http://blog.dakarlug.org/2008/11/24/\
resume-apres-midi-linux22112008/",
"http://blog.dakarlug.org/2008/11/10/\
apres-midi-linux-et-logiciels-libres-22-novembre-2008/",
"http://blog.dakarlug.org/2008/09/28/\
on-sen-est-sorti/",
"http://blog.dakarlug.org/2008/08/26/\
journee-du-logiciel-libre-rendez-vous-le-20-septembre-a-lauf/",
"http://blog.dakarlug.org/2013/09/18/\
journee-mondiale-des-logiciels-libres-edition-2013-dakar/"

]

_urls =[
"http://blog.dakarlug.org/2013/09/18/\
journee-mondiale-des-logiciels-libres-edition-2013-dakar/"
]
// request
scrapper =  function(_url){
  request(_url, function(err, resp, body){
    var s = '\
title\
![test screenshot](image "")\
content\
     '
    if (err) throw Error('error')
    else {
      $ = cheerio.load(body);
      // Title
      $('.contenttitle').each(
          function(idx, html){
            var title = $(html).text()
            s = s.replace(/title/, title)
            
            // Markdown meta block - title
            s = 'title: ' + title.trim() + "\n" + s
            
            // Markdown meta block - lead
            // no lead present in dakarlug source; use title value instead as 
            // default value
            s = 'lead: ' + title.trim() + "\n" + s;     
          }
      )
      $('.contentbody').each(
          function(idx, html){
            s = s.replace(/content/, $(html).text())
          }
      )
      //affiche 
      $('.contentbody img').each(
            function(idx, html){
              src = $(html).attr("src")
              if (src.indexOf('media') != -1){
              // We got the image for article
              if (src.indexOf('http') ==-1){
                src = "http://blog.dakarlug.org/" + src
              }
              s = s.replace(/image/, src) 
              }
            }
      )
      
      // Markdown meta block - author
      var author = $('.contentitempostedby').text().split('par')[1].trim();
      s = 'author: ' + author + "\n" + s;
      //contentitempostedby
      
      // filename
      name= _url.split('/').slice(3, 7).join('-')
      
      // Markdown meta block - slug
      s = 'slug: ' + name + "\n" + s;
       
      // Markdown meta block - date
      s = 'date: ' + name.slice(0, 10) + "\n" + s;
      
      // write file
      var str_ = fs.writeFileSync(name + ".md", s);
    }
  }
  )
}
//Ha!
for( var i =0; i< _urls.length;i++){
  scrapper(_urls[i])
}
