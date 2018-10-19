using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Message
    {
        public long Id { get; set; }
        public int UserSenderId { get; set; }
        public int? UserReceiverId { get; set; }
        public string Title { get; set; }
        public string MessageContent { get; set; }
        public DateTime ActionDateTime { get; set; }
        public bool IsSenderDeleted { get; set; }
        public bool IsReceiverDeleted { get; set; }
        public bool IsSent { get; set; }

    }
}
