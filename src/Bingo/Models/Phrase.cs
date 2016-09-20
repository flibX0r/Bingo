using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bingo.Models
{
    public class Phrase
    {
        public int id { get; set; }
        public string phrase { get; set; }
    }
}
