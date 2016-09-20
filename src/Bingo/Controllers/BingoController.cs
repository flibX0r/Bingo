using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Bingo.Models;

namespace Bingo.Controllers
{
    [Route("api")]
    public class BingoController : Controller
    {
        private dbContext db;

        public BingoController(dbContext context)
        {
            db = context;
        }


        public class GetBingoResponse
        {
            public List<List<string>> tiles { get; set; }

            public GetBingoResponse()
            {
                tiles = new List<List<string>>();
            }
        }


        // GET api/values
        [HttpGet("get")]
        public ActionResult GetBingo()
        {
            GetBingoResponse resp = new GetBingoResponse();
            List<Phrase> phrases = db.Phrases.ToList();

            phrases.Shuffle();
            phrases = phrases.Take(25).ToList();

            for (int r = 0; r < 5; r++) {
                resp.tiles.Add(phrases.GetRange(r * 5, 5).Select(p => p.phrase).ToList());
            }

            return Json(resp);
        }

    }


}
