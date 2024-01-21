module.exports = (creators, page, r, platform) => {
    
    for(let i = 0, count = 0; i<page[1]; i++){

        creators.push([]);

        for(let j = 0; j<10; j++){

            if(count >= r.length){
                break;
            }

            let lifeViews = "";
            let monthViews = "";

            if(platform == 1){
                lifeViews = r[count].analytics.youtube.total.lifeTimeTotalViews + "";
                monthViews = r[count].analytics.youtube.total.thirtyDaysViews + "";

                if(r[count].analytics.youtube.total.lifeTimeTotalViews > 999999){
                    lifeViews = (Math.round(r[count].analytics.youtube.total.lifeTimeTotalViews / 100000) / 10) + "Mil";
                }

                //if(r[count].analytics.youtube.total.thirtyDaysViews > 999999){
                //    monthViews = (Math.round(r[count].analytics.youtube.total.thirtyDaysViews / 100000) / 10) + "Mil";
                //}
                monthViews = "Null";
            }

            if(platform == 2){
                lifeViews = r[count].analytics.tikTok.total.lifeTimeTotalViews + "";
                monthViews = r[count].analytics.tikTok.total.thirtyDays + "";

                if(r[count].analytics.tikTok.total.lifeTimeTotalViews > 999999){
                    lifeViews = (Math.round(r[count].analytics.tikTok.total.lifeTimeTotalViews / 100000) / 10) + "Mil";
                }

                if(r[count].analytics.tikTok.total.thirtyDays > 999999){
                    monthViews = (Math.round(r[count].analytics.tikTok.total.thirtyDays / 100000) / 10) + "Mil";
                }
            }

            let name = `__${count+1}. ${r[count].data.name}__`;
            let value = "*Lifetime views*: " + lifeViews + "\n*Past 30 days*: "+ monthViews;
            let inline = true;

            if(count == 0){
                name = `__🥇 ${r[count].data.name}__`;
            }
            if(count == 1){
                name = `__🥈 ${r[count].data.name}__`;
            }
            if(count == 2){
                name = `__🥉 ${r[count].data.name}__`;
            }

            creators[i].push({
                name: name,
                value: value,
                inline: inline,
            });
            
            count++;

        }
    }

    return creators;

};