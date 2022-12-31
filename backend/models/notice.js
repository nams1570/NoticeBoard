class Notice 
{
    constructor(noticeName,dueDate,priority)
    {
        this.noticeName = noticeName;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = '';
    }
    setDescription(newDesc)
    {
        this.description = newDesc;
    }
}
module.exports.Notice = Notice;