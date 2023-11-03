using System.Dynamic;
using sulfone_helium.Api.Core;

namespace sulfone_helium.Api.Processor;

public struct ProcessorReq
{
    public string ReadDir { get; set; }
    
    public string WriteDir { get; set; }
    
    public IEnumerable<CyanGlobReq> Globs { get; set; }
    
    public ExpandoObject Config { get; set; }
}