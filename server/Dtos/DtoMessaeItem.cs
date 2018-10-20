using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class DtoMessaeItem
    {
        public string Id { get; set; }
        public string Title {get; set;}
        public string To { get; set;}
        public string Date {get; set;}
    }
}
