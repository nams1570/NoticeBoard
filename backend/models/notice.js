class Notice 
{
    constructor(noticeName,dueDate,priority)
    {
        this.noticeName = noticeName;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = '';
        this.dueClass = '';
    }
    setDescription(newDesc)
    {
        this.description = newDesc;
    }
    setDueClass(systemDate)
    {
        console.log(systemDate+ ': system date and '+this.dueDate+': dueDate of notice')
        var dueObject = new Date(this.dueDate.toString()+'T03:05:00')
        //compare month and day.
        var dateComparisonScore = ((dueObject.getFullYear() - systemDate.getFullYear())*100) + ((dueObject.getMonth()-systemDate.getMonth())*10) + (dueObject.getDate() - systemDate.getDate())
        console.log(dateComparisonScore)
        if(dateComparisonScore <0)
        {
            this.dueClass = 'Backlog'
        }
        else if(dateComparisonScore ==0)
        {
            this.dueClass = 'Today'
        }
        else if(dateComparisonScore <=8)
        {
            this.dueClass = 'Coming Week'
        }
        else if(dateComparisonScore <=32)
        {
            this.dueClass = 'Coming Month'
        }
        else
        {
            this.dueClass = 'Beyond'
        }
    }   
}
module.exports.Notice = Notice;