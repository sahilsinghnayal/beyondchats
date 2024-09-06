'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MenuIcon, UserCircle, Search, Edit, Trash2, X, ChevronLeft, ChevronRight,Columns4 } from 'lucide-react'

// Generate more fake data
const generateFakeData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      data: `Sample chatbot response ${i + 1}. This is an example of what the chatbot might say in response to a user query.`,
      source: `Source ${i + 1}`,
      type: "TEXT",
      created: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()
    })
  }
  return data
}

export function ChatbotMindMap() {
  const [searchTerm, setSearchTerm] = useState('')
  const [resultsPerPage, setResultsPerPage] = useState('10')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const allData = generateFakeData(50) // Generate 50 fake data items

  // Filter data based on search term
  const filteredData = allData.filter(item => 
    item.data.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.source.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Paginate data
  const indexOfLastItem = currentPage * parseInt(resultsPerPage)
  const indexOfFirstItem = indexOfLastItem - parseInt(resultsPerPage)
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredData.length / parseInt(resultsPerPage))

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Side Drawer */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-red-800 text-white transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30`}>
        <div className="p-4">
          <Button variant="ghost" className="mb-4 text-white hover:text-red-800" onClick={() => setIsDrawerOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
          <nav>
            <ul className="space-y-2">
              <li><Button variant="ghost" className="w-full justify-start text-white hover:text-red-800">View mind map</Button></li>
              <li><Button variant="ghost" className="w-full justify-start text-white hover:text-red-800">Analytics</Button></li>
              <li><Button variant="ghost" className="w-full justify-start text-white hover:text-red-800">Settings</Button></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${isDrawerOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b border-gray-200 shadow-sm">
       
      {/* Dropdown Button - Visible on mobile only */}
      

      {/* Dropdown content - Only visible on mobile */}
      {isOpen && (
        <div className="block sm:hidden absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="flex flex-col space-y-4 p-4  items-end">
          <button onClick={toggleDropdown} className="text-red-500 hover:text-red-700">
              <X className="h-6 w-6" />
            </button>
            <Button 
              variant="outline" 
              className="w-full text-green-800 border-green-800 hover:bg-blue-50"
            >
              GUIDED TOUR
            </Button>
            
            <Select>
              <SelectTrigger className="w-full border-blue-300 text-black">
                <SelectValue placeholder="SELECT ORG" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="org1">Organization 1</SelectItem>
                <SelectItem value="org2">Organization 2</SelectItem>
              </SelectContent>
            </Select>

            <button className="w-full flex justify-center">
              <UserCircle className="h-8 w-8 text-blue-600" />
            </button>
          </div>
        </div>
      )}

          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button className='text-black' variant="ghost" size="icon" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <MenuIcon className="h-6 w-6 text-1000" />
              </Button>
              <h1 className="text-xl font-bold text-blue-800">Chatbot Mind Map</h1>
              
            </div>
            <button
        onClick={toggleDropdown}
        className="block sm:hidden p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
<Columns4 />      </button>
            <div className="hidden sm:flex items-center space-x-4">
              <Button variant="outline" className="text-green-800 border-green-800 hover:bg-blue-50">GUIDED TOUR</Button>
              <Select>
                <SelectTrigger className="w-[180px] border-blue-300 text-black	">
                  <SelectValue placeholder="SELECT ORG" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="org1">Organization 1</SelectItem>
                  <SelectItem value="org2">Organization 2</SelectItem>
                </SelectContent>
              </Select>
              <UserCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
        </header>
        <main className="container mx-auto px-4 py-8">
          <p className="text-sm text-gray-600 mb-4">
            This is the brain and the memory of the chatbot. You can add, edit and analyse
            the source data being used to answer user queries from here
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ ADD DATA</Button>
            <Button variant="secondary" className="bg-red-600 text-white hover:bg-red-400">DATA TRAINING STATUS</Button>
            <Button variant="secondary" className="bg-orange-600 text-white-800 hover:bg-orange-400">GROUND TRUTHS</Button>
          </div>
          <div className="flex flex-wrap items-end gap-4 mb-8">
            <div className="flex-grow">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                id="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-black	"
              />
            </div>
            <div>
              <label htmlFor="results" className="block text-sm font-medium text-gray-700 mb-2">Results per page</label>
              <Select value={resultsPerPage} onValueChange={(value) => { setResultsPerPage(value); setCurrentPage(1); }}>
                <SelectTrigger className="w-[100px] border-blue-300 text-black	">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Search className="mr-2 h-4 w-4" /> SEARCH
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-blue-800 font-extrabold ">Data</TableHead>
                  <TableHead className="text-blue-800 font-extrabold">Source</TableHead>
                  <TableHead className="text-blue-800 font-extrabold">Type</TableHead>
                  <TableHead className="text-blue-800 font-extrabold">Created</TableHead>
                  <TableHead className="text-blue-800 font-extrabold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody style={{color:"black"}}>
                {currentItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-blue-50">
                    <TableCell className="font-medium">{item.data}</TableCell>
                    <TableCell>{item.source}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
            </div>
            <div className="flex items-center space-x-2 text-black	">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}