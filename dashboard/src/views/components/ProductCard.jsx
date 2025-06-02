const ProductCard = () => {
  return (
    <div className="bg-light dark:bg-dark rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">

      </div>
      
      <div className="mt-4">
        <h3 className="text-dark-text dark:text-light-text font-semibold">کارت ملک</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-success text-xl font-bold"> تومان</p>
          <button className="bg-primary hover:bg-primary-dark text-light px-4 py-2 rounded-lg transition-colors">
            افزودن به سبد
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard