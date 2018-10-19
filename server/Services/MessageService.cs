using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IMessageService
    {
        Message Save(Message msg);
        //IEnumerable<Message> GetAll();
        //Message GetById(int id);
        //Message Create(Message Message, string password);
        //void Update(Message Message, string password = null);
        //void Delete(int id);
    }

    public class MessageService : IMessageService
    {
        private DataContext _context;

        public MessageService(DataContext context)
        {
            _context = context;
        }

      
        public Message Save(Message msg)
        {
            // validation
            if (string.IsNullOrWhiteSpace(msg.Title))
                throw new AppException("عنوان اجباری است");

            if (string.IsNullOrWhiteSpace(msg.MessageContent))
                throw new AppException("متن پیام اجباری است");

            if (msg.UserReceiverId == null || msg.UserReceiverId == 0)
                throw new AppException("وارد کردن گیرنده اجباری است");

            if (_context.Users.Count(x => x.Id == msg.UserReceiverId.Value) <= 0)
                throw new AppException("ایمیل گیرنده معتبر نمیباشد");

        
            _context.Messages.Add(msg);
            _context.SaveChanges();

            return msg;
        }
    }
}
