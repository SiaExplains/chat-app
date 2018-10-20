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
        IEnumerable<Message> GetInbox(int userId);
        IEnumerable<Message> GetDrafts(int userId);
        IEnumerable<Message> GetSents(int userId);
        Message GetById(int id);
        //void Update(Message Message, string password = null);
        void Delete(int id);
    }

    public class MessageService : IMessageService
    {
        private DataContext _context;

        public MessageService(DataContext context)
        {
            _context = context;
        }

        public void Delete(int id)
        {
            var msg = _context.Messages.Find(id);
            if (msg != null)
            {
                _context.Messages.Remove(msg);
                _context.SaveChanges();
            }
        }

        public Message GetById(int id)
        {
            return _context.Messages.SingleOrDefault(m => m.Id == id);
        }

        public IEnumerable<Message> GetDrafts(int userId)
        {
            return _context.Messages.Where(m =>  m.IsSent == false && m.UserSenderId == userId).ToList();
        }

        public IEnumerable<Message> GetInbox(int userId)
        {
            return _context.Messages.Where(m => m.IsSent == true && m.UserReceiverId == userId).ToList();
        }

        public IEnumerable<Message> GetSents(int userId)
        {
            return _context.Messages.Where(m => m.IsSent == true && m.UserSenderId == userId).ToList();
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
