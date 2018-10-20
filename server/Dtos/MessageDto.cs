using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class MessageDto
    {
        public string To { get; set; }
        public string Content { get; set; }
        public string Title{ get; set; }
        public bool ShouldSent { get; set; }
    }
}
